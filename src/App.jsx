import { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

const App = () => {
  const [xAxis, setXAxis] = useState(0)
  const [yAxis, setYAxis] = useState(0)
  const [blur, setBlur] = useState(0)
  const [spread, setSpread] = useState(0)
  const [shadowColor, setShadowColor] = useState('#1c1c1c')
  const [opacity, setOpacity] = useState(0.5)
  const [shadow, setShadow] = useState('')
  const [boxColor, setBoxColor] = useState('#f1f1f1')
  const [boxRounded, setBoxRounded] = useState(0)

  useEffect(() => {
    setBoxColor(boxColor)
  }, [boxColor])

  useEffect(() => {
    setBoxRounded(boxRounded)
  }, [])

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
      <h1 className='title'>css box shadow generator</h1>
      <div className='main-container'>
        <div className='controls'>
          <h3 className='inner-title'>Box Controls</h3>
          <label htmlFor='boxColor'>
            Box Color:
            <input
              type='color'
              id='boxColor'
              value={boxColor}
              onChange={(e) => setBoxColor(e.target.value)}
            />
          </label>
          <label htmlFor='rounded'>
            Rounded:
            <input
              type='range'
              id='rounded'
              min='0'
              max='50'
              value={boxRounded}
              onChange={(e) => setBoxRounded(e.target.value)}
            />
          </label>
          <br />

          <h3 className='inner-title'>Shadow Controls</h3>
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
          <div
            className='box'
            style={{
              boxShadow: shadow,
              background: boxColor,
              borderRadius: `${boxRounded}%`,
            }}
          ></div>
        </div>
      </div>
      <div className='copy-container'>
        <code className='code'>box-shadow: {shadow}</code>
        <CopyToClipboard text={`box-shadow: ${shadow} `}>
          <button className='copy-btn'>copy</button>
        </CopyToClipboard>
      </div>
    </div>
  )
}
export default App
