import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { createClient } from '@web3-storage/w3up-client'
import { useState } from 'react';
export default function Home() {
  let [log, setLog] = useState([])
  const client = createClient({
    serviceDID: 'did:key:z6MkrZ1r5XBFZjBU34qyD8fueMbMRkKw17BZaq2ivKFjnz2z',
    serviceURL: 'https://8609r1772a.execute-api.us-east-1.amazonaws.com',
    accessDID: 'did:key:z6MkkHafoFWxxWVNpNXocFdU6PL2RVLyTEgS1qTnD3bRP7V9',
    accessURL: 'https://access-api.web3.storage',
    settings: new Map()
  })
  async function registerAndUpload(e) {
    e.preventDefault()
    e.stopPropagation()
    let lines = []
    if (e.target.email.value.length > 0 && e.target.file.files.length > 0) {
      lines = lines.concat("check your email to login...")
      setLog(lines)
      const r0 = await client.register(e.target.email.value)
      lines = lines.concat([r0, "uploading..."])
      setLog(lines)
      let buf = await e.target.file.files[0].arrayBuffer()
      let arr = new Uint8Array(buf)
      const r1 = await client.upload(arr)
      const cids = await client.list()
      lines = lines.concat([r1, JSON.stringify(cids, null, 2)])
      setLog(lines)
    } else {
      alert("please enter an email address and select a file")
    }
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form onSubmit={registerAndUpload}>
          <p className={styles.description}>
            <input type='email' placeholder='email' name='email' id='email' />
            <input type='file' name='file' id='file' />
            <input type='submit' value='upload' />
          </p>
          {log.map((line, i) => { return <pre key={i}>Step {i}. {line}</pre> })}
        </form>
      </main>
    </div>
  )
}
