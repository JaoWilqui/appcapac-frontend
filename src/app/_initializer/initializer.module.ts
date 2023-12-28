import { APP_INITIALIZER, NgModule } from '@angular/core';
import { InitializerService } from './initializer.service';

export function getProfileInitializer(configService: InitializerService) {
  return () => {
    const token = localStorage.getItem('token');

    if (token) {
      return configService.getInfo();
    } else {
      return null;
    }
  };
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: getProfileInitializer,
      deps: [InitializerService],
      multi: true,
    },
  ],
})
export class InitializerModule {}
