# MICROFRONT

## Crear Microfronts

Comando> `ng new shell --standalone --routing`
Comando> `ng new mf-dashboard --standalone --routing`
Comando> `ng new mf-products --standalone --routing`
Comando> `ng new mf-orders --standalone --routing`

## Instalar "Module Federation"

Se necesita instalar la librería "module-federation" en cada microfront

Comando> `npm i @angular-architects/module-federation`

## Configurar los module Federation

Se necesita configurar el host (shell) y los microfront remotos (products y orders)

Micro front (shell)          Comando> `ng add @angular-architects/module-federation --project shell --port 4200 --type host`
Micro front (mf-auth)        Comando> `ng add @angular-architects/module-federation --project mf-auth --port 4201 --type remote`
Micro front (mf-dashboard)   Comando> `ng add @angular-architects/module-federation --project mf-dashboard --port 4202 --type remote`
Micro front (mf-products)    Comando> `ng add @angular-architects/module-federation --project mf-products --port 4203 --type remote`
Micro front (mf-orders)      Comando> `ng add @angular-architects/module-federation --project mf-orders --port 4204 --type remote`

## Configurar Webpacks

### Micro front (mf-auth)

    Se necesita exponer los "routes" del microfront

    `
    //webpack.config.js
        ..
        exposes: {
            './routes': './src/app/app.routes.ts',
        },
        ..
    `

### Micro front (mf-dashboard)

    Se necesita exponer los "routes" del microfront

    `
    //webpack.config.js
        ..
        exposes: {
            './routes': './src/app/app.routes.ts',
        },
        ..
    `

### Micro front (mf-products)

    Se necesita exponer los "routes" del microfront

    `
    //webpack.config.js
        ..
        exposes: {
            './routes': './src/app/app.routes.ts',
        },
        ..
    `

### Micro front (mf-orders)

    Se necesita exponer los "routes" del microfront

    `
    //webpack.config.js
        ..
        exposes: {
            './routes': './src/app/app.routes.ts',
        },
        ..
    `

### Host (shell)

    1. Se necesita tipar todos los paths de configuración (EcmaScript Modules) referenciando al micro frontend

        1.1 - Creamos un archivo 'decl.d.ts' en la carpeta raiz de "src"
        1.2 - Editar el archivo 'decl.d.ts' y agregar lo siguiente
        `
            declare module 'mf-auth/*';
            declare module 'mf-dashboard/*';
            declare module 'mf-products/*';
            declare module 'mf-orders/*';
        `
    
    2. Se necesita especificar los mf fronts que están siendo expuestos para integrarlos remotamente en el host (shell)

    `
    //webpack.config.js
        remotes: {
            "mf-auth": "http://localhost:4201/remoteEntry.js",
            "mf-dashboard": "http://localhost:4202/remoteEntry.js",
            "mf-products": "http://localhost:4203/remoteEntry.js",
            "mf-orders": "http://localhost:4204/remoteEntry.js",
        },
        ..
    `
