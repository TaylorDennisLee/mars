import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Field } from './field.model';

@Injectable()
export class NewEntryService {
    constructor (private http: Http) {}

    getFields(form_id: string): Observable<Field[]> {
        console.log("In Entry Service, getting: " + form_id);
        return this.http.get('../../assets/static/final_json/new_acm_'+form_id+'_fields.json')
        .map(res => res.json());
    }

    getField(id): Observable<Field> {
        return this.http.get('/api/fields/' + id)
        .map(res => res.json());
    }

    // saveHero(hero) {
    //     if (hero.id === 0) {
    //         return this.http.post('/api/heroes', hero)
    //         .map(res => res.json());
    //     } else {
    //         return this.http.put('/api/heroes/' + hero.id, hero)
    //         .map(res => res.json());
    //     }
    // }
    //
    // deleteHero(hero) {
    //     return this.http.delete('/api/heroes/' + hero.id)
    //     .map(res => hero);
    // }
}
