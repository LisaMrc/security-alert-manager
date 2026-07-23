import { useReducer, useEffect, useRef } from "react"

const IPS = ["8.8.8.8", "1.1.1.1", "185.220.101.5", "45.148.10.92", "104.244.72.115"]
const THREAT_TYPES = ["Brute-Force SSH", "Port Scan", "SQL Injection", "DDoS", "Credential Stuffing"]
const MAX_ALERTS = 100 // prevents list from growing too much

export const SEVERITIES = ["low", "medium", "high", "critical"]

// Mocked data
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// alerts take the same shape as the brief
function generateMockAlert() {
  return {
    id: crypto.randomUUID(),
    ip: IPS[Math.floor(Math.random() * IPS.length)],
    timestamp: new Date().toISOString(),
    severity: SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)],
    threat_type: THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)],
    status: "active",
    is_read: false,
  }
}

// Manage state transitions
function alertsReducer(state, action) {
  switch (action.type) {
    case "ADD_ALERT":
        // add new alerts at the bottom, keep the 100th lasts
      return [...state, action.payload].slice(-MAX_ALERTS)
    case "UPDATE_STATUS":
      return state.map((a) =>
        a.id === action.payload.id ? { ...a, status: action.payload.status } : a
      )
    default:
      return state
  }
}

// Hook
export function useAlertStream(intervalMs = 15000) {
  const [alerts, dispatch] = useReducer(alertsReducer, [])
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      dispatch({ type: "ADD_ALERT", payload: generateMockAlert() })
    }, intervalMs)

    return () => clearInterval(intervalRef.current) // cleanup obligatoire
  }, [intervalMs])

  function updateAlertStatus(id, status) {
    dispatch({ type: "UPDATE_STATUS", payload: { id, status } })
  }

  return { alerts, updateAlertStatus }
}