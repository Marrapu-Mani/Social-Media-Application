import { TrendData } from '../../data/TrendData';

function TrendCard() {
    return (
        <div className='flex flex-col gap-4 bg-cardColor py-4 px-8 rounded-xl'>
            <h3 className="font-bold text-lg">Trends for you</h3>
            <ul className='flex flex-col gap-4'>
                {TrendData.map((trend, index) => {
                    return (
                        <li key={index} className='flex flex-col gap-1'>
                            <span className='font-bold'>#{trend.name}</span>
                            <span className='text-[13px]'>{trend.shares}k shares</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default TrendCard;