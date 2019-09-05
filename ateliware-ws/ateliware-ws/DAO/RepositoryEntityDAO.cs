using ateliware_ws.Dados;
using ateliware_ws.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ateliware_ws.DAO
{
    public class RepositoryEntityDAO
    {
        public List<Repositorio> Listar()
        {
            List<Repositorio> Repositorio = new List<Repositorio>();
            List<Linguagem> Linguagem = new List<Linguagem>();

            try
            {
                
                using (var contexto = new RepositorioContext())
                {
                    Repositorio = contexto.Repositorios.ToList();
                    Linguagem = contexto.Linguagens.ToList();
                }

                Repositorio.ForEach(v_Object =>
                {
                    v_Object.Linguagem = Linguagem.Where(L => L.ID_NODE == v_Object.ID_NODE).ToList();
                });

                return Repositorio;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public bool Adicionar(List<Repositorio> Repositorio)
        {
            List<Repositorio> RepositorioExistente = new List<Repositorio>();
            List<Repositorio> RepositorioGravar = new List<Repositorio>();

            try
            {
                using (var contexto = new RepositorioContext())
                {
                    RepositorioExistente = contexto.Repositorios.ToList();

                    Repositorio.ForEach(v_Objeto =>
                    {
                        if (!RepositorioExistente.Exists(r => r.ID_NODE == v_Objeto.ID_NODE))
                        {
                            RepositorioGravar.Add(v_Objeto);
                        }
                    });

                    contexto.Repositorios.AddRange(RepositorioGravar);
                    contexto.SaveChanges();
                }
            }
            catch(Exception ex)
            {
                return false;
                throw;
            }

            return true;
        }
    }
}