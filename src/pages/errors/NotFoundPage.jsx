import ErrorTemplate from './ErrorTemplate';

export default function NotFoundPage() {
    return (
        <ErrorTemplate 
            code="404" 
            title="Página no encontrada" 
            description="Lo sentimos, no pudimos encontrar la página que estás buscando. Puede que haya sido movida o eliminada." 
        />
    );
}
