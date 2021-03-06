import React, { useState } from 'react'

import fetch from 'cross-fetch'

const S3Upload = () => {
  const [file, setFile] = useState(null)

  const changeFile = e => {
    setFile(e.target.files[0])
  }

  const submit = e => {
    e.preventDefault()

    fetch(`/api/sign-s3?name=${file.name}&type=${file.type}`, { method: 'GET' })
      .then(res => {
        if (!res.ok) throw new Error('Get S3 signed request failed')
        return res.json()
      })
      .then(data => fetch(data.upload, { method: 'PUT', body: file }))
      .catch(err => console.error(err))
  }

  return (
    <form onSubmit={submit}>
      <h1>S3 Upload</h1>
      <p id="status">Please select a file...</p>
      <input type="file" name="sampleFile" onChange={changeFile} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default S3Upload
