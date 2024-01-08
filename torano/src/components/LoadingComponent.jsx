export default function LoadingComponent() {
    return (
        <div className='position-relative position-fixed z-3' style={{
            width:'100%',
            maxWidth:'100vw',
            height:'100vh',

        }}>
            <div className="position-absolute loader"
            style={{
               top:'50%',
                left:'50%',
                 transform:'translate(-50%,-50%)'
            }}></div>

        </div>
    )
}