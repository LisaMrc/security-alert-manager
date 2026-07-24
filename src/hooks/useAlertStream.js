import { useReducer, useEffect, useRef } from 'react'
import { toast } from 'sonner'

// Mocked data
const MAX_ALERTS = 100 // prevents list from growing too much
const FAILURE_RATE = 0.15 // 15% of failing risk (mocked - done so you can see how errors are handled)

export const IPS = [
  '8.8.8.8',
  '1.1.1.1',
  '185.220.101.5',
  '45.148.10.92',
  '104.244.72.115',
]

export const THREAT_TYPES = [
  'Brute-Force SSH',
  'Port Scan',
  'SQL Injection',
  'DDoS',
  'Credential Stuffing',
]

export const SEVERITIES = ['low', 'medium', 'high', 'critical']

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
    status: 'active',
    is_read: false,
  }
}

// Uses a variety of errors to seem more natural
function generateMockError() {
  const codes = [429, 500, 502, 503]
  const code = codes[Math.floor(Math.random() * codes.length)]
  return { code, message: `Alert feed error (${code})` }
}

// Manage state transitions
function alertsReducer(state, action) {
  switch (action.type) {
    case 'ADD_ALERT':
      // add new alerts at the bottom, keep the 100th lasts
      return [...state, action.payload].slice(-MAX_ALERTS)
    case 'UPDATE_STATUS':
        // go through all the alerts and change the status of the one with the corresponding id
      return state.map((a) =>
        a.id === action.payload.id
          ? { ...a, status: action.payload.status }
          : a,
      )
    default:
      return state
  }
}

// Hook
export function useAlertStream(intervalMs = 15000) {

// No-code version of this line :
  const [alerts, dispatch] = useReducer(alertsReducer, [])
  
// Create an empty list of alerts
// When I will modify it, I'll use a reducer, which is AlertsReducer

// Stock these variables that useReducer gives you :
// - current list → alerts
// - the tool to modify it → dispatch
  
  const intervalRef = useRef(null)

  useEffect(() => {
    // tick need dispatch that is in this hook instance
    // ie : needs to be defined here or else dispatch doesn't exist
    function tick() {
      if (Math.random() < FAILURE_RATE) {
        const { code, message } = generateMockError()
        toast.error(message, {
          description: 'The alert feed will retry automatically.',
        })
        return
      }
      dispatch({ type: 'ADD_ALERT', payload: generateMockAlert() })
    }

    intervalRef.current = setInterval(tick, intervalMs)
    return () => clearInterval(intervalRef.current)
  }, [intervalMs])

  function updateAlertStatus(id, status) {
    dispatch({ type: 'UPDATE_STATUS', payload: { id, status } })
  }

  return { alerts, updateAlertStatus }
}
