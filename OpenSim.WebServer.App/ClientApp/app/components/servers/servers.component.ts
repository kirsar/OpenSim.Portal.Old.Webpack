import { Component, Inject, } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: "servers",
    templateUrl: "./servers.component.html",
    styleUrls: ["./servers.component.css"]
})
export class ServersComponent {
    public servers?: Server[];
   
    constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
        http.get(baseUrl + 
            "api/v1/servers?fields=_embedded/servers(" +
                "id,name,description,isRunning," +
                "_links/self," +
                "_embedded(" +
                    "author(id,name,_links/self)," +
                    "simulations(id,name,description,_links/self)," +
                    "presentations(id,name,description,_links/self)))").subscribe(
            result => this.servers = result/*.json()._embedded.servers*/ as Server[],
            error => console.error(error));
    }
}

interface Server {
    name: string;
    description: string;
    isRunning: boolean;
    _embedded: Embedded;
}

interface Embedded {
    author: Author;
    simulations: Simulation[];
    presentations: Presentation[];
}

interface Author {
    id: number;
    name: string;
}

interface Simulation {
    id: number;
    name: string;
    description: string;
}

interface Presentation {
    id: number;
    name: string;
    description: string;
}
