import { AuthInitService } from '../auth-init.service';

export function authInit(authInitService: AuthInitService) {
  return () => authInitService.authInit();
}
