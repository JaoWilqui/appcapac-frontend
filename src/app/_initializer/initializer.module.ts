import { APP_INITIALIZER, NgModule } from '@angular/core';
import { InitializerService } from './initializer.service';

export function getProfileInitializer(configService: InitializerService) {
  return async () => {
    const token = localStorage.getItem('authToken');

    if (token) {
      return await configService.getInfo();
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
