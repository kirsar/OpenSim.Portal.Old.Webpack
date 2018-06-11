import { Component, Inject, } from "@angular/core";
import { Http } from "@angular/http";

@Component({
    selector: "new-server-form",
    templateUrl: "./new-server.component.html",
    styleUrls: ["./new-server.component.css"]
})
export class NewServerFormComponent {
    public simulations: Simulation[];

    constructor(private http: Http, @Inject("BASE_URL") private baseUrl: string) {
        http.get(baseUrl + "api/v1/simulations").subscribe(
            results => this.simulations = results.json()._embedded.simulations as Simulation[],
            error => console.error(error));
    }

    server = new Server("New Server 1");

    //get isSimulationSelected() {
    //    return this.simulations.filter(s => s.isSelected).length > 0;
    //}

    onCreate() {
        //this.simulations.filter(s => s.isSelected).forEach(s =>
        //    this.server.simulations.push(s));

        //debugger;
        //this.http.post(this.baseUrl + "api/v1/servers", this.server);
    }
}

export class Server {
    constructor(
        public name: string
    ) { }

    description?: string;
    isRunning: boolean;
    simulations: Simulation[];
}

//interface Embedded {
//    author: Author;
//    simulations: Simulation[];
//    presentations: Presentation[];
//}

//interface Author {
//    name: string;
//}

interface Simulation {
    id: number;
    name: string;
    description: string;
    isSelected: boolean;
}

//interface Presentation {
//    name: string;
//    description: string;
//}