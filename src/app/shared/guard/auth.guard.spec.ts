import {TestBed, async, inject} from '@angular/core/testing';
import {AuthGuard} from './auth.guard';

describe('AuthGuard', () =>{
    beforeEach(() =>{
        TestBed.configureTestingModule({
            imports: [],
            providers: [AuthGuard]
        });
    });

    it('should ...', inject([AuthGuard], (guard: AuthGuard) =>{
        expect(guard).toBeTruthy();
    }));
});
