import { Component } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'socialLoginApp';
  user: any;
  loggedIn: any;
  constructor(
    private authService: SocialAuthService,
    public _authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user: any) => {
      this.user = user;
      console.log('Google service response', user);
      console.log('🔑 [Google idToken]:', user?.idToken);
      this.handelSignIn(this.user.idToken);
    });
  }

  handelSignIn(idToken: any) {
    // this._authService.signUpWithGmail({ idToken }).subscribe(
    //   (data) => {
    //     console.log('Success Response of SignUp from backend', data);
    //    }
    // )
    this._authService.loginWithGmail({ idToken }).subscribe({
      next: (data) => {
        console.log('Success Response of SignIn from backend', data);
        console.log('🔑 [Backend Token]:', data?.token);
        if (data?.token) {
          localStorage.setItem('token', data.token);
        }
      },
      error: (err) => {
        console.error('Error Response from backend:', err);
      }
    });


    // try {
    //   const data = await firstValueFrom(
    //     this._authService.loginWithGmail({ idToken })
    //   );        
    //   console.log('Success Response of SignIn ', data);

    // } catch (error) {
    //   console.log('Failed to login and we will start signUp process' );
    //   try {
    //     const data = await firstValueFrom(
    //       this._authService.signUpWithGmail({ idToken })
    //     );
    //     console.log('Success Response of SignUp ', data);
    //   } catch (error) {
    //     console.log(error);
    //     console.log('Failed to signUp');
    //   }
    // }
  }
}
