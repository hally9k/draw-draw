import React, { useState, useEffect } from 'react';
import starMonster from './assets/StarMonster.svg';
import spiralMonster from './assets/SpiralMonster.svg';
import cravingMonster from './assets/CravingMonster.svg';

import './App.css';

const BELLAS_DEFAULT_TOTAL = 13
const ANIELAS_DEFAULT_TOTAL = 65


interface Jobs {
  [key: string]: { complete: boolean, value: number }
}

const BELLAS_DEFAULT_JOBS: Jobs = {
  warCashDaddy: { complete: false, value: 10 },
  warCashMama: { complete: false, value: 10 },
  roomroom: { complete: false, value: 5 },
  kitchen1: { complete: false, value: 6 },
  kitchen2: { complete: false, value: 6 },
  bathington: { complete: false, value: 3 },
  feedBey: { complete: false, value: 2 },
  feedMelaaa: { complete: false, value: 2 },
  lookAfterMoash: { complete: false, value: 10 }
}
const ANIELAS_DEFAULT_JOBS: Jobs = {
  warCashDaddy: { complete: false, value: 10 },
  warCashMama: { complete: false, value: 10 },
  roomroom: { complete: false, value: 5 },
  kitchen1: { complete: false, value: 6 },
  kitchen2: { complete: false, value: 6 },
  bathington: { complete: false, value: 3 },
  feedBey: { complete: false, value: 2 },
  feedMelaaa: { complete: false, value: 2 },
  lookAfterMoash: { complete: false, value: 10 }
}



function App() {

  const [bellaCode, setBellaCode] = useState('')
  const [anielaCode, setAnielaCode] = useState('')
  const [bellasJobs, setBellasJobs] = useState<Jobs>({})
  const [anielasJobs, setAnielaJobs] = useState<Jobs>({})
  const [bellasTotal, setBellasTotal] = useState(0)
  const [anielasTotal, setAnielasTotal] = useState(0)

  useEffect(() => {
    let localBellasJobs: string | null = window.localStorage.getItem('BELLAS_JOBS')
    let localAnielasJobs: string | null = window.localStorage.getItem('ANIELAS_JOBS')

    if (!localBellasJobs) {
      window.localStorage.setItem('BELLAS_JOBS', JSON.stringify(BELLAS_DEFAULT_JOBS))
      setBellasJobs(BELLAS_DEFAULT_JOBS)
    } else {
      setBellasJobs(JSON.parse(localBellasJobs))
    }

    if (!localAnielasJobs) {
      window.localStorage.setItem('ANIELAS_JOBS', JSON.stringify(ANIELAS_DEFAULT_JOBS))
      setAnielaJobs(ANIELAS_DEFAULT_JOBS)
    } else {
      setAnielaJobs(JSON.parse(localAnielasJobs))
    }


    let bellasLocalTotal: string | null = window.localStorage.getItem('BELLAS_TOTAL')
    let anielasLocalTotal: string | null = window.localStorage.getItem('ANIELAS_TOTAL')

    if (!bellasLocalTotal) {
      window.localStorage.setItem('BELLAS_TOTAL', JSON.stringify(BELLAS_DEFAULT_TOTAL))
      setBellasTotal(BELLAS_DEFAULT_TOTAL)
    } else {
      setBellasTotal(parseInt(bellasLocalTotal, 10))
    }

    if (!anielasLocalTotal) {
      window.localStorage.setItem('ANIELAS_TOTAL', JSON.stringify(ANIELAS_DEFAULT_TOTAL))
      setAnielasTotal(ANIELAS_DEFAULT_TOTAL)
    } else {
      setAnielasTotal(parseInt(anielasLocalTotal, 10))
    }
  }, [])


  function completeBellasJob(bellaCode: string) {
    bellasJobs[bellaCode].complete = true

    window.localStorage.setItem('BELLAS_JOBS', JSON.stringify(bellasJobs))

    setBellasTotal((prevValue) => {

      window.localStorage.setItem('BELLAS_TOTAL', JSON.stringify(prevValue + bellasJobs[bellaCode].value))

      return prevValue + bellasJobs[bellaCode].value
    })


  }

  function completeAnielasJob(anielaCode: string) {
    anielasJobs[anielaCode].complete = true

    window.localStorage.setItem('ANIELAS_JOBS', JSON.stringify(anielasJobs))

    setAnielasTotal((prevValue) => prevValue + anielasJobs[anielaCode].value)

    window.localStorage.setItem('ANIELAS_TOTAL', JSON.stringify(anielasTotal))
  }

  function handleCheckCode(event: any) {
    const { currentTarget } = event

    const kid = currentTarget.getAttribute("data-kid")
    if (kid === 'bella') {
      if (Object.keys(bellasJobs).includes(bellaCode) && bellasJobs[bellaCode].complete === false) {
        completeBellasJob(bellaCode)
      }
    } else if (kid === 'aniela') {
      if (Object.keys(anielasJobs).includes(anielaCode) && anielasJobs[anielaCode].complete === false) {
        completeAnielasJob(anielaCode)
      }
    }
  }

  function handleInputChange(event: any) {
    const { currentTarget } = event

    const kid = currentTarget.getAttribute("data-kid")

    if (kid === 'bella') {
      setBellaCode(currentTarget.value)
    } else if (kid === 'aniela') {
      setAnielaCode(currentTarget.value)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={starMonster} className="star-monster" alt="star-monster" />
        <img src={spiralMonster} className="spiral-monster" alt="spiral-monster" />
        <img src={cravingMonster} className="craving-monster" alt="craving-monster" />


      </header>

      <br />
      <br />

      <h1 className="title">🛹🛹🛹 SKATEBOARD FUND 🛹🛹🛹</h1>

      <table className="pocket-money-table">
        <thead>
          <tr>
            <th>
              <h2>Bella</h2>
              <input type="text" onChange={handleInputChange} data-kid="bella" value={bellaCode} />&nbsp;
              <button onClick={handleCheckCode} data-kid="bella">CHECK CODE</button>
              <h1>Total: ${bellasTotal}</h1>
            </th>
            <th>
              <h2>Aniela</h2>
              <input type="text" onChange={handleInputChange} data-kid="aniela" value={anielaCode} />&nbsp;
              <button onClick={handleCheckCode} data-kid="aniela">CHECK CODE</button>
              <h1>Total: ${anielasTotal}</h1>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>
              {Object.values(bellasJobs).map(({ complete }, index) => complete ? <h1 key={index}><span role="img">🥇</span></h1> : null)}
            </th>
            <th>
              {Object.values(anielasJobs).map(({ complete }, index) => complete ? <h1 key={index}><span role="img">🥇</span></h1> : null)}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
