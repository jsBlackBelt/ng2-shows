import { Injectable } from "@angular/core";
import { observable, action } from "mobx";
import { ActorService } from "../actor-details/actor.service";

@Injectable()
export class ActorStore {

    @observable
    currentActor: any;

    @observable
    currentActorShows: any[] = [];

    constructor(private actorService: ActorService) {

    }

    @action
    setActor(actor: any) {
        this.currentActor = actor;
    }

    @action
    setActorShows(shows) {
        this.currentActorShows = shows;
    }

    @action
    getActorShows() {
        if (this.currentActor) {
            this.actorService.getActorShows(this.currentActor.id)
                .subscribe(credits => {
                    let shows: any[] = credits.map((credit) => {
                        return credit._embedded.show;
                    });

                    this.setActorShows(shows);
                });
        }
    }
}