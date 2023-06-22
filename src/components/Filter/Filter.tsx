import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Filter() {
    const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        const buttons = document.querySelectorAll('.home_filter_type');

        buttons.forEach((button) => {
            button.classList.remove('type_active');
        });
        e.currentTarget.classList.add('type_active');
    };
    return (
        <>
            {/* Button filter */}
            <button className="p-2 center home_button_filter w-100 fs-6 rounded-2">
                <FontAwesomeIcon icon={faFilter} />
                <span className=" ms-2">Filter</span>
            </button>
            {/* Nav lọc công việc theo type */}
            <div className="bg mt-3 flex-grow-1 d-flex flex-column align-items-center rounded-3">
                <div className="mt-2 mb-3 fw-medium ">Type</div>
                <button className="home_filter_type type_active mb-4" onClick={handleClickButton}>
                    ALL
                </button>
                <button className="home_filter_type mb-4" onClick={handleClickButton}>
                    Group
                </button>
                <button className="home_filter_type mb-4" onClick={handleClickButton}>
                    Me
                </button>
            </div>
        </>
    );
}

export default Filter;
