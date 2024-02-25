import { Routes } from '@angular/router';
import { InAppComponent } from './in-app/in-app.component';
import { MainScreenComponent } from './in-app/main-screen/main-screen.component';
import { WordsComponent } from './in-app/words/words.component';
import { SettingsComponent } from './in-app/settings/settings.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { LoginComponent } from './onboarding/login/login.component';
import { SignUpComponent } from './onboarding/sign-up/sign-up.component';
import { ReadingComponent } from './in-app/reading/reading.component';
import { SiteComponent } from './onboarding/site/site.component';
import { VerificationComponent } from './onboarding/verification/verification.component';

export const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
    ],
  },
  {
    path: 'app',
    component: InAppComponent,
    children: [
      { path: '', component: MainScreenComponent },
      { path: 'word', component: WordsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'read', component: ReadingComponent },
      { path: 'read/:articleId', component: ReadingComponent },
      { path: 'read/:articleId/:chapterId', component: ReadingComponent },
    ],
  },
  {
    path: 'lobby',
    component: OnboardingComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'verification/:verifyId', component: VerificationComponent }
    ],
  },
];
