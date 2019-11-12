import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from 'angularx-social-login';

const googleSocialConfig = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('367102572250-6jlpr0qf7250cojdh72j0dkq5fcjf234.apps.googleusercontent.com')
  }
]);

export default googleSocialConfig;
