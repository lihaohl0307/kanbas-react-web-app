export default function StylingAddons() {
    return (
        <div id="wd-css-styling-addons">
            <h3>Addons</h3>
            <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <span className="input-group-text">0.00</span>
                <input className="form-control" type="text"/>
            </div>
            <div className="input-group">
                <input type="text" className="form-control" />
                <span className="input-group-text">$</span>
                <span className="input-group-text">0.00</span>
            </div>
        </div>
    );
}