import ErrorTemplate from './ErrorTemplate';

export default function ServerErrorPage() {
    return (
        <ErrorTemplate 
            code="500" 
            title="Error del Servidor" 
            description="Ups, algo salió mal de nuestro lado. Estamos trabajando para solucionarlo. Por favor, intenta de nuevo más tarde." 
        />
    );
}
