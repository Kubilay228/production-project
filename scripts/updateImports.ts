import { ImportDeclaration, Project } from 'ts-morph'

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()

function isAbsolut(value: string) {
    const layers = ['app', 'shared', 'features', 'entities', 'widgets', 'pages']
    return layers.some(layer => value.startsWith(layer))
}

files.forEach(sourceFile => {
    const impotrtDeclarations = sourceFile.getImportDeclarations()
    impotrtDeclarations.forEach(impotrtDeclaration => {
        const value = impotrtDeclaration.getModuleSpecifierValue()

        if (isAbsolut(value)) {
            impotrtDeclaration.setModuleSpecifier(`@/${value}`)
        }
    })
})

project.save()