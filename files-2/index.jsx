import { css } from "uebersicht"

// ============================================
// CONFIGURATION — modifie ces valeurs à ta guise
// ============================================
const START_VALUE = 10945        // valeur de départ en euros
const RATE_PER_SECOND = 0.35     // euros ajoutés chaque seconde
const RESET_AT_MIDNIGHT = true   // true = repart de START_VALUE chaque jour à minuit
const START_DATE = "2026-06-18T00:00:00" // point de départ si RESET_AT_MIDNIGHT = false

// Position du widget sur l'écran (top/right/bottom/left en px)
const POSITION = `
  top: 40px;
  right: 40px;
`

// ============================================
export const refreshFrequency = 1000 // rafraîchit chaque seconde

export const className = css`
  ${POSITION}
  width: 320px;
  padding: 20px 24px;
  background: linear-gradient(135deg, #0a0e1a 0%, #111a2e 100%);
  border: 1px solid rgba(0, 200, 255, 0.4);
  border-radius: 14px;
  box-shadow: 0 0 25px rgba(0, 200, 255, 0.25), inset 0 0 20px rgba(0,200,255,0.05);
  font-family: "SF Mono", Menlo, monospace;
  color: #e6f7ff;
  -webkit-backdrop-filter: blur(6px);

  .label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #5fd4ff;
    opacity: 0.85;
    margin-bottom: 8px;
  }

  .value {
    font-size: 32px;
    font-weight: 600;
    color: #ffffff;
    text-shadow: 0 0 12px rgba(0, 200, 255, 0.6);
    white-space: nowrap;
  }

  .unit {
    font-size: 16px;
    color: #5fd4ff;
    margin-left: 4px;
  }

  .pulse {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00ff88;
    margin-left: 8px;
    box-shadow: 0 0 8px #00ff88;
    vertical-align: middle;
  }
`

const getStartTime = () => {
  if (RESET_AT_MIDNIGHT) {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return now.getTime()
  }
  return new Date(START_DATE).getTime()
}

export const render = () => {
  const elapsedSeconds = (Date.now() - getStartTime()) / 1000
  const current = START_VALUE + Math.max(0, elapsedSeconds) * RATE_PER_SECOND

  const formatted = current.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <div>
      <div className="label">
        Chiffre d'affaires — Stark <span className="pulse"></span>
      </div>
      <div className="value">
        {formatted}
        <span className="unit">€</span>
      </div>
    </div>
  )
}
