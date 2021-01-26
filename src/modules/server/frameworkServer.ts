import childProcess from 'child_process'

export const frameworkServer = () => {
  const commandBin = 'yarn'
  const ps = childProcess.spawn(commandBin, ['start'], {
    env: { ...process.env, FORCE_COLOR: 'true' },
    stdio: 'pipe',
  })

  ps.stdout.pipe(process.stdout)
  ps.stderr.pipe(process.stderr)

  process.stdin.pipe(process.stdin)

  const handleProcessExit = (code: any) => {
    console.log(code)
    process.exit(code)
  }

  ps.on('close', handleProcessExit)
  ps.on('SIGINT', handleProcessExit)
  ps.on('SIGTERM', handleProcessExit)

  const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGHUP', 'exit']

  exitSignals.forEach((signal) => {
    process.on(signal, () => {
      try {
        process.kill(-ps.pid)
      } catch (error) {
        // Ignore
      }

      process.exit()
    })
  })
}
