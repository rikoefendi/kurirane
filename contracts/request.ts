declare module '@ioc:Adonis/Core/Request' {
    interface RequestContract {
      startTime: [number, number]
    }
  }