import React, { useState } from 'react';

const Profile = (props) => {
  return (
    <div>
      <button>
        <h2>
          So Glad you are back
        </h2>
      </button>

      <button size="large" disabled>
        <h2>Login</h2>
      </button>

      <form >
      <TextField
        id="email"
        label="email"
        variant="outlined"
        autoFocus
        fullWidth
        required
        onChange={(event) => this.setState({ email: event.target.value })}
      />
      <div style={{ height: '30px' }}>
      </div>
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        required
        fullWidth
        onChange={(event) => this.setState({ password: event.target.value })}
      />

      <button>Login</button>
      </form>
    </div>
  )
}

export default Profile;