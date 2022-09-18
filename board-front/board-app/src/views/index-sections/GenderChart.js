import { PieChart } from 'react-minimal-pie-chart';

const GenderChart = (props) => {
    return (
        <>
            <PieChart className='chart-box'
                data={[
                    { title: '여', value: props.female, color: '#FF6666' },
                    { title: '남', value: props.male, color: '#66B2FF' },
                ]}
                lineWidth={60}
                background="#FFFFFF"
                animate
            />
            <div className='chart-lb'>
                <ul className='chart-lb-wrap'>
                    <li>
                        <p className='color-box' style={{ background: '#66B2FF' }}></p>
                        <dl className='lb-detail'>
                            <dt>남</dt>
                            <dd className='lb-perc'>{props.male}%</dd>
                        </dl>
                    </li>
                    <li>
                        <p className='color-box' style={{ background: '#FF6666' }}></p>
                        <dl className='lb-detail'>
                            <dt>여</dt>
                            <dd className='lb-perc'>{props.female}%</dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default GenderChart;