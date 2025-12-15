FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /src

# Copy everything into container
COPY . .

# Run the app with hot reload
CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:8081"]
