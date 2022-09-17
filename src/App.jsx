import { useEffect, useState } from 'react'

const App = () => {
  const [xAxis, setXAxis] = useState(0)
  const [yAxis, setYAxis] = useState(0)
  const [blur, setBlur] = useState(0)
  const [spread, setSpread] = useState(0)
  const [shadowColor, setShadowColor] = useState('#1c1c1c')
  const [opacity, setOpacity] = useState(0)
  const [shadow, setShadow] = useState('')

  useEffect(() => {
    setShadow(
      `${xAxis}px ${yAxis}px ${blur}px ${spread}px ${ahex_to_rba(shadowColor)}`
    )
  }, [yAxis, xAxis, blur, spread, shadowColor, opacity])

  function ahex_to_rba(ahex) {
    ahex = ahex.substring(1, ahex.length)
    ahex = ahex.split('')

    var r = ahex[0] + ahex[0],
      g = ahex[1] + ahex[1],
      b = ahex[2] + ahex[2],
      a = ahex[3] + ahex[3]

    if (ahex.length >= 6) {
      r = ahex[0] + ahex[1]
      g = ahex[2] + ahex[3]
      b = ahex[4] + ahex[5]
      a = ahex[6] + (ahex[7] ? ahex[7] : ahex[6])
    }

    var int_r = parseInt(r, 16),
      int_g = parseInt(g, 16),
      int_b = parseInt(b, 16),
      int_a = parseInt(a, 16)

    int_a = int_a / 255

    if (int_a < 1 && int_a > 0) int_a = int_a.toFixed(2)

    if (int_a || int_a === 0)
      return 'rgba(' + int_r + ', ' + int_g + ', ' + int_b + ', ' + int_a + ')'
    return 'rgba(' + int_r + ', ' + int_g + ', ' + int_b + ', ' + opacity + ')'
  }

  return (
    <div className='App'>
      <div className='controls'>
        <label htmlFor='x'>
          X Axis:{' '}
          <input
            type='range'
            min='-100'
            max='100'
            value={xAxis}
            id='x'
            onChange={(e) => setXAxis(e.target.value)}
          />
        </label>
        <label htmlFor='y'>
          Y Axis:{' '}
          <input
            type='range'
            min='-100'
            max='100'
            value={yAxis}
            id='y'
            onChange={(e) => setYAxis(e.target.value)}
          />
        </label>
        <label htmlFor='blur'>
          Blur:{' '}
          <input
            type='range'
            min='0'
            max='300'
            value={blur}
            id='blur'
            onChange={(e) => setBlur(e.target.value)}
          />
        </label>
        <label htmlFor='spread'>
          Spread:{' '}
          <input
            type='range'
            min='-200'
            max='200'
            value={spread}
            id='spread'
            onChange={(e) => setSpread(e.target.value)}
          />
        </label>
        <label htmlFor='shadowColor'>
          ShadowColor:
          <input
            type='color'
            id='shadowColor'
            value={shadowColor}
            onChange={(e) => setShadowColor(e.target.value)}
          />
        </label>
        <label htmlFor='opacity'>
          Opacity:
          <input
            type='range'
            min='0.00'
            max='1.00'
            step='0.1'
            value={opacity}
            id='opacity'
            onChange={(e) => setOpacity(e.target.value)}
          />
        </label>
      </div>
      <div className='preview'>
        <div className='box' style={{ boxShadow: shadow }}></div>
      </div>
      <code className='code'>box-shodow: {shadow}</code>
    </div>
  )
}
export default App
