/**
 * SectionWave - the same layered wave divider the homepage uses, extracted so
 * every page can flow cleanly between a light and a navy band. `from` is the
 * colour of the section ABOVE, `to` the section BELOW.
 */
export function SectionWave({
  from,
  to,
  flip = false,
}: {
  from: string
  to: string
  flip?: boolean
}) {
  return (
    <div
      className={"wave-divider -mb-px" + (flip ? " wave-divider-flip" : "")}
      style={{ background: to, lineHeight: 0 }}
      aria-hidden
    >
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
        <path
          d="M0,0 L1440,0 L1440,44 C1170,82 980,8 720,40 C500,67 250,18 0,46 Z"
          fill={from}
          opacity="0.45"
        />
        <path
          d="M0,0 L1440,0 L1440,34 C1140,70 860,12 600,38 C380,60 180,30 0,40 Z"
          fill={from}
        />
      </svg>
    </div>
  )
}

export default SectionWave
