import { inject } from "@angular/core";
import { CanActivateFn, Router} from "@angular/router";
// CanActivateFn -> Voce usa para permitir/barrar a navegação antes de ativar um Route
import { AuthService } from "./services/auth.services";

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService)
    const router = inject(Router)
    if (auth.isAuthenticated()) return true;
    router.navigateByUrl('/login')
    return false
}