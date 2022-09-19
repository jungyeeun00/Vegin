import { PieChart } from 'react-minimal-pie-chart';

function AgeChart(props)  {
   
    return (
        <>
            <PieChart className='chart-box'
                data={[
                    { title: '20세 미만', value: props.teens, color: '#FF6666' },
                    { title: '20~29세', value: props.twenties, color: '#66B2FF' },
                    { title: '30~39세', value: props.thirties, color: '#FF7F50' },
                    { title: '40세 이상', value: props.forties, color: '#9ACD32' }
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
                            <dt>20세 미만</dt>
                            <dd className='lb-perc'>{props.teens}%</dd>
                        </dl>
                    </li>
                    <li>
                        <p className='color-box' style={{ background: '#FF6666' }}></p>
                        <dl className='lb-detail'>
                            <dt>20~29세</dt>
                            <dd className='lb-perc'>{props.twenties}%</dd>
                        </dl>
                    </li>
                    <li>
                        <p className='color-box' style={{ background: '#FF7F50' }}></p>
                        <dl className='lb-detail'>
                            <dt>30~39세</dt>
                            <dd className='lb-perc'>{props.thirties}%</dd>
                        </dl>
                    </li>
                    <li>
                        <p className='color-box' style={{ background: '#9ACD32' }}></p>
                        <dl className='lb-detail'>
                            <dt>40세 이상</dt>
                            <dd className='lb-perc'>{props.forties}%</dd>
                        </dl>
                    </li>
                  
                </ul>
            </div>
        </>
    );
}

export default AgeChart;
