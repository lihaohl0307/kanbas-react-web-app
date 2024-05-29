export default function ScreenSizeLabel() {
    return (
        <div id="wd-screen-size-label">
            <div className="d-block d-sm-none fa-2x">
            XS - Extra Small (&lt;576px)
            </div>
            {/* d-none d-sm-block d-md-none fa-2x:
            This element is hidden by default (d-none).
            It becomes visible on small devices (≥576px) (d-sm-block).
            It is hidden again on medium devices (≥768px) (d-md-none).
            The text is scaled to 2 times the normal size using Font Awesome (fa-2x). */}
            <div className="d-none d-sm-block d-md-none fa-2x">
            S - Small (≥576px)
            </div>
            <div className="d-none d-md-block d-lg-none fa-2x">
            M - Medium (≥768px)
            </div>
            <div className="d-none d-lg-block d-xl-none fa-2x">
            L - Large (≥992px)
            </div>
            <div className="d-none d-xl-block d-xxl-none fa-2x">
            XL - Extra Large (≥1200px)
            </div>
            <div className="d-none d-xxl-block fa-2x">
            XXL - Extra Extra Large (≥1400px)
            </div>
      </div>
    
    );
}