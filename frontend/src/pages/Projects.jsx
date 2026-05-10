import React, { useEffect } from 'react';
import { useProjectStore } from '../store';

const Projects = () => {
  const { projects, fetchProjects, isLoading } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <section className="bg-secondary text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold">Mis Proyectos</h1>
          <p className="text-gray-300 mt-4">Trabajos realizados y casos de éxito</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <p className="text-center">Cargando proyectos...</p>
          ) : projects.length > 0 ? (
            <div className="grid gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-gray-200 flex items-center justify-center h-64">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl">📸</span>
                      )}
                    </div>
                    <div className="p-8 md:w-2/3">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-sm font-bold text-gray-700 mb-2">Tecnologías:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies_list?.map((tech) => (
                            <span key={tech} className="bg-primary text-white text-xs px-3 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 items-center">
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            GitHub →
                          </a>
                        )}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
                            Ver en vivo
                          </a>
                        )}
                        <span className="text-gray-500 text-sm">👁️ {project.views_count} vistas</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No hay proyectos disponibles</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
