FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
RUN apt-get update ;\
    apt-get install -y tzdata
WORKDIR /src
COPY ["Database/Database.csproj", "Database/"]
COPY ["DataImporter/DataImporter.csproj", "DataImporter/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["GitInsights/GitInsights.csproj", "GitInsights/"]
RUN dotnet restore "GitInsights/GitInsights.csproj"
COPY . .
WORKDIR "/src/GitInsights"
RUN dotnet build "GitInsights.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "GitInsights.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .

ENTRYPOINT ["dotnet", "GitInsights.dll"]
CMD ASPNETCORE_URLS=http://*:$PORT dotnet out/GitInsights.dll