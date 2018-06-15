import { Component, Inject, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UploadEvent, UploadFile, FileSystemFileEntry } from 'ngx-file-drop';

@Component({
    selector: "new-simulation-form",
    templateUrl: "./new-simulation.component.html",
    styleUrls: ["./new-simulation.component.css"]
})
export class NewSimulationFormComponent {
    constructor(
        private readonly http: HttpClient,
        @Inject("BASE_URL") private readonly baseUrl: string,
        private readonly changeDetection: ChangeDetectorRef) { }

    public fileEntry?: FileSystemFileEntry;
    public message: string = "";
    private simulation?: Simulation; 

    public dropped(event: UploadEvent) {
        const droppedFile = event.files[0] as UploadFile;

        if (droppedFile.fileEntry.isFile) {
            const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {

                // check if it's a simulation and store a file
                this.fileEntry = fileEntry;
                this.changeDetection.detectChanges();

                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = () => {
                    var json = JSON.parse(reader.result);

                    this.simulation = new Simulation(json["name"]);

                    const httpOptions = {
                        headers: new HttpHeaders({ 'Content-Type': 'application/hal+json' })
                    };

                    this.http.post(this.baseUrl + "api/v1/simulations", this.simulation, httpOptions).subscribe(
                        res => {
                            this.simulationCreated.emit(res as Simulation);
                        });
                }
            });
        } else
            this.message = droppedFile.fileEntry.name + "is not a paltform compatible simulation file";


            //            /**
            //            // You could upload it like this:
            //            const formData = new FormData()
            //            formData.append('logo', file, relativePath)

            //            // Headers
            //            const headers = new HttpHeaders({
            //              'security-token': 'mytoken'
            //            })

            //            this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
            //            .subscribe(data => {
            //              // Sanitized logo returned from backend
            //            })
            //            **/
    }

    public isValid = () => this.fileEntry !== undefined && this.fileEntry !== null;
    
    public onUpload() {
        this.fileEntry = undefined;
    }
    @Output() simulationCreated = new EventEmitter<Simulation>();

    public fileOver(event: any) {
        console.log(event);
    }

    public fileLeave(event: any) {
        console.log(event);
    }
}

class Simulation {
    constructor(private name: string) {
    }

    description: string;
    references: string[];
}