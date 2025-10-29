export interface GoogleLoginDto {
    IdToken: string;
    Name: string;
    Email: string;
    PhotoUrl: string;
    FirstName: string;
    LastName: string;
    Password?: string;
    ConfirmPassword?: string;
}
