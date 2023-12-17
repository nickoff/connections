import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { OkSnackbarService } from 'src/app/core/services/snackbar/ok-snackbar.service';
import { PeopleItemModel } from 'src/app/shared/models';

import { PEOPLE_ACTIONS } from '.';

@Injectable()
export class PeopleEffect {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private okSnackbar: OkSnackbarService
  ) {}

  feachPeople$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PEOPLE_ACTIONS.getPeople),
      switchMap(() =>
        forkJoin({
          people: this.apiService.getPeopleList(),
          conversations: this.apiService.getConversationsList()
        }).pipe(
          map(({ people, conversations }) => {
            const peopleWithConversation: PeopleItemModel[] = people.Items.map((person) => {
              const conversationId = conversations.Items.find((item) => item.companionID.S === person.uid.S);
              return {
                ...person,
                conversationId: conversationId ? conversationId.id : null
              };
            });
            this.okSnackbar.openSnackbar('People list loaded');
            return PEOPLE_ACTIONS.getPeopleSuccess({ people: { Count: people.Count, Items: peopleWithConversation } });
          }),
          catchError((error) => {
            return of(PEOPLE_ACTIONS.getPeopleFail({ error }));
          })
        )
      )
    );
  });
}
