import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.langfella',
  appName: 'langfella',
  webDir: 'dist/langfella/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
