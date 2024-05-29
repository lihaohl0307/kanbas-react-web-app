export default function StylingSlider() {
    return (
        <div id="wd-css-styling-range-and-sliders">
            <h3>Range</h3>
            <input className="form-range" id="range1" type="range" 
            min={0} max={5} step={0.5}/>
            <label className="form-label" htmlFor="range1">
                Example Range
            </label>
        </div>
    );
}