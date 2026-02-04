# HIS GoTRUST Scaffolding Script
# Run this in PowerShell to set up the project structure.

# 1. Create Root Directories
Write-Host "Creating root directories..."
New-Item -ItemType Directory -Force -Path "docs"
New-Item -ItemType Directory -Force -Path "his-gotrust-backend"
New-Item -ItemType Directory -Force -Path "his-gotrust-frontend"
New-Item -ItemType Directory -Force -Path "deploy"

# 2. Setup Backend (.NET 8 Clean Architecture)
Push-Location "his-gotrust-backend"
Write-Host "Setting up Backend Solution..."

# Create Solution
dotnet new sln -n HIS.GoTrust

# Create Projects
Write-Host "Creating projects..."
dotnet new classlib -n HIS.GoTrust.Domain
dotnet new classlib -n HIS.GoTrust.Application
dotnet new classlib -n HIS.GoTrust.Infrastructure
dotnet new webapi -n HIS.GoTrust.API -o HIS.GoTrust.API

# Add References
Write-Host "Adding references..."
# Application depends on Domain
dotnet add HIS.GoTrust.Application/HIS.GoTrust.Application.csproj reference HIS.GoTrust.Domain/HIS.GoTrust.Domain.csproj

# Infrastructure depends on Application (and implicitly Domain)
dotnet add HIS.GoTrust.Infrastructure/HIS.GoTrust.Infrastructure.csproj reference HIS.GoTrust.Application/HIS.GoTrust.Application.csproj

# API depends on Application and Infrastructure
dotnet add HIS.GoTrust.API/HIS.GoTrust.API.csproj reference HIS.GoTrust.Application/HIS.GoTrust.Application.csproj
dotnet add HIS.GoTrust.API/HIS.GoTrust.API.csproj reference HIS.GoTrust.Infrastructure/HIS.GoTrust.Infrastructure.csproj

# Add to Solution
Write-Host "Adding projects to solution..."
dotnet sln add HIS.GoTrust.Domain/HIS.GoTrust.Domain.csproj
dotnet sln add HIS.GoTrust.Application/HIS.GoTrust.Application.csproj
dotnet sln add HIS.GoTrust.Infrastructure/HIS.GoTrust.Infrastructure.csproj
dotnet sln add HIS.GoTrust.API/HIS.GoTrust.API.csproj

Pop-Location

# 3. Create Placeholder Files
New-Item -ItemType File -Force -Path "docs/brd.md" -Value "# HIS GoTRUST BRD"

Write-Host "Backend Scaffolding Complete!"
