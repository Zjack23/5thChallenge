document.addEventListener('DOMContentLoaded', () => {
    const currentDayElement = document.getElementById('currentDay');
    const timeBlocksElement = document.getElementById('timeBlocks');

    const currentDate = new Date();
    currentDayElement.textContent = currentDate.toDateString();

    const businessHours = [
        '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'
    ];

    businessHours.forEach(hour => {
        const timeBlock = document.createElement('div');
        timeBlock.className = 'time-block';

        const hourElement = document.createElement('div');
        hourElement.className = 'hour';
        hourElement.textContent = hour;

        const eventElement = document.createElement('input');
        eventElement.className = 'event';
        eventElement.type = 'text';

        const saveButton = document.createElement('button');
        saveButton.className = 'saveBtn';
        saveButton.textContent = 'Save';

        timeBlock.appendChild(hourElement);
        timeBlock.appendChild(eventElement);
        timeBlock.appendChild(saveButton);
        timeBlocksElement.appendChild(timeBlock);

        const savedEvent = localStorage.getItem(hour);
        if (savedEvent) {
            eventElement.value = savedEvent;
        }

        saveButton.addEventListener('click', () => {
            localStorage.setItem(hour, eventElement.value);
        });
    });

    const updateTimeBlockColors = () => {
        const currentHour = currentDate.getHours();
        document.querySelectorAll('.time-block').forEach((timeBlock, index) => {
            const hourText = businessHours[index];
            const [hour, period] = hourText.split(' ');

            const hourNumber = parseInt(hour);
            const isPM = period === 'PM';
            const hour24 = isPM && hourNumber !== 12 ? hourNumber + 12 : hourNumber;

            if (hour24 < currentHour) {
                timeBlock.classList.add('past');
            } else if (hour24 === currentHour) {
                timeBlock.classList.add('present');
            } else {
                timeBlock.classList.add('future');
            }
        });
    };

    updateTimeBlockColors();
});
