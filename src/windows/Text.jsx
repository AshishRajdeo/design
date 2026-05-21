import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window';

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;

    // Our bulletproof path fixer
    const getAsset = (path) => {
        if (!path) return '';
        return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\.\/|^\//g, '')}`;
    };

    if(!data) return null;

    const {name, image, subtitle, description } = data;
    
  return (
    <>
    <div id='window-header'>
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
    </div>
    <div className='p-5 space-y-6  bg-white'>
        {image ? (
            <div className='w-full'>
                {/* Apply getAsset to the incoming image path */}
                <img src={getAsset(image)} alt={name} className='w-full h-auto rounded' />
            </div>
        ) : null}

        {subtitle ? <h3 className='text-lg font-semibold'>{subtitle}</h3> : null}
        {
            Array.isArray(description) && description.length > 0 ? (
                <div>
                    {description.map((para, idx) => (
                        <p key={idx}>{para}</p>
                    ))}
                    </div>
            ) : null
        }
    </div>
    </>
  )
}

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;