using Autofac;

namespace githubproj.IoC
{
    public class ModuleIoC : Module
    {
       
            protected override void Load(ContainerBuilder builder)
            {
                ConfigurationIOC.Load(builder);
            }
    }
}
