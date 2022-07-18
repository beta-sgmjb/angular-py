export interface JwtResponse {
    dataUsuario: {
        id: number,
        name: string,
        email: string,
        password: string,
        accessToken: string,
        rol: string
    }
}
