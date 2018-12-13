import { Component, } from '@angular/core';
import { Server } from '../../model/server';
import { StorageService } from '../../service/storage-service'
import { AuthenticationService } from '../../service/authentication-service'
import { ServerRequestBuilder } from '../../service/request-builder/server.builder'

@Component({
    selector: 'servers',
    templateUrl: './servers.component.html',
    styleUrls: ['./servers.component.css']
})
export class ServersComponent {
    public servers: Server[] = [];
   
    constructor(private readonly service: StorageService,
        auth: AuthenticationService) {
        this.queryServers();
        //auth.login('user', 'User123$').subscribe();
    }

    private queryServers = () => 
        this.service.getServers(new ServerRequestBuilder()
            .withSimulations()
            .withPresentations()
            .withAuthor()).subscribe(
                (servers: Server[]) => this.servers = servers,
                (error: any) => console.error(error));

    public onServerCreated(server: Server) {
        this.servers.push(server);
    }
}
