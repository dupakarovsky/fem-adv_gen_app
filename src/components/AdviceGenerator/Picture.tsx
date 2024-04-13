import "./Picture.css";

/*
    =====================
    * PICTURE COMPONENT
    =====================
*/
type PictureSourcesType = {
    sourceSet: string;
    media: string;
};
type PictureType = {
    sources: PictureSourcesType[];
    fallbackImgURL: string;
};
export const Picture: React.FC<PictureType> = ({ sources, fallbackImgURL }) => {
    const renderedSources = sources.map((source) => {
        return <source key={source.sourceSet} srcSet={source.sourceSet} media={source.media}></source>;
    });

    return (
        <picture>
            {renderedSources}
            <img src={fallbackImgURL} />
        </picture>
    );
};
