const features = [

    "PDF Upload",
    
    "AI Chat",
    
    "Citations",
    
    "Analytics",
    
    "Widget Builder",
    
    "Multi Tenant"
    
    ];
    
    export default function Features() {
    
    return (
    
    <section className="max-w-6xl mx-auto py-16">
    
    <h2 className="text-4xl font-bold mb-8">
    
    Features
    
    </h2>
    
    <div className="grid grid-cols-3 gap-6">
    
    {features.map((item)=>(
    
    <div
    key={item}
    className="border rounded p-6">
    
    <h3 className="font-bold">
    
    {item}
    
    </h3>
    
    </div>
    
    ))}
    
    </div>
    
    </section>
    
    );
    
    }