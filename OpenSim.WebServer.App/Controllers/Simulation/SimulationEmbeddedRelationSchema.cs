﻿using System.Linq;
using OpenSim.WebServer.Model;
using WebApi.Hal;

namespace OpenSim.WebServer.Controllers
{
    public class SimulationEmbeddedRelationSchema : ResourseEmbeddedRelationsSchema<SimulationResource, Simulation>
    {
        public SimulationEmbeddedRelationSchema()
        {
            RegisterEmbeddedRelation(LinkTemplates.Simulations.Author.Rel, (resource, model, relationName) => 
                resource.Author = new UserInfoResource(model.Author, relationName));

            RegisterEmbeddedRelation(LinkTemplates.Simulations.GetReferences.Rel, (resource, model, relationName) => 
                resource.References = new ResourceList<SimulationResource>(relationName, 
                    model.References.Select(s => new SimulationResource(s, relationName))));

            RegisterEmbeddedRelation(LinkTemplates.Simulations.GetConsumers.Rel, (resource, model, relationName) => 
                resource.Consumers = new ResourceList<SimulationResource>(relationName, 
                    model.Consumers.Select(s => new SimulationResource(s, relationName))));

            RegisterEmbeddedRelation(LinkTemplates.Simulations.GetPresentations.Rel, (resource, model, relationName) => 
                resource.Presentations = new ResourceList<PresentationResource>(relationName, 
                    model.Presentations.Select(p => new PresentationResource(p, relationName))));
        }
    }
}