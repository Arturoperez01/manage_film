/**
 *
 *
  _____                      _              _ _ _     _   _     _        __ _ _
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|

 * DO NOT EDIT THIS FILE!!
 *
 *  FOR CUSTOMIZE actorBaseService PLEASE EDIT ../actor.service.ts
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */
 // DEPENDENCIES
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// CONFIG
import { environment } from '../../../environments/environment';

// MODEL
import { Actor } from '../../domain/manage_film_example_db/actor';

/**
 * THIS SERVICE MAKE HTTP REQUEST TO SERVER, FOR CUSTOMIZE IT EDIT ../Actor.service.ts
 */

/*
 * SCHEMA DB Actor
 *
	{
		birthDate: {
			type: 'Date'
		},
		name: {
			type: 'String',
			required : true
		},
		surname: {
			type: 'String'
		},
		//RELATIONS
		//EXTERNAL RELATIONS
		cast: [{
			type: Schema.ObjectId,
			ref : "Film"
		}],
	}
 *
 */
@Injectable()
export class ActorBaseService {

    contextUrl: string = environment.endpoint + '/actor';
    constructor(
        protected http: HttpClient
        ) { }

    // CRUD METHODS

    /**
    * ActorService.create
    *   @description CRUD ACTION create
    *
    */
    create(item: Actor): Observable<Actor> {
        return this.http
            .post<Actor>(this.contextUrl, item)
            .pipe(map(data => data));
    }

    /**
    * ActorService.delete
    *   @description CRUD ACTION delete
    *   @param ObjectId id Id
    *
    */
    remove(id: string): Observable<void> {
        return this.http
            .delete<void>(this.contextUrl + '/' + id)
            .pipe(map(data => data));
    }

    /**
    * ActorService.get
    *   @description CRUD ACTION get
    *   @param ObjectId id Id 
    *
    */
    get(id: string): Observable<Actor> {
        return this.http
            .get<Actor>(this.contextUrl + '/' + id)
            .pipe(map(data => data));
    }

    /**
    * ActorService.list
    *   @description CRUD ACTION list
    *
    */
    list(): Observable<Actor[]> {
        return this.http
            .get<Actor[]>(this.contextUrl)
            .pipe(map(data => data));
    }

    /**
    * ActorService.update
    *   @description CRUD ACTION update
    *   @param ObjectId id Id
    *
    */
    update(item: Actor): Observable<Actor> {
        return this.http
            .post<Actor>(this.contextUrl + '/' + item._id, item)
            .pipe(map(data => data));
    }


    // Custom APIs

}
